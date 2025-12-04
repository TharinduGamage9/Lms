import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Visitor from '@/models/Visitor';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'all'; // 'today', 'week', 'month', 'all'

    let startDate: Date | null = null;
    const now = new Date();

    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      default:
        startDate = null;
    }

    const query: any = {};
    if (startDate) {
      query.timestamp = { $gte: startDate };
    }

    // Total visits
    const totalVisits = await Visitor.countDocuments(query);

    // Unique visitors (based on unique IPs in the period)
    const uniqueVisitors = await Visitor.distinct('ip', query);

    // Visits by page
    const visitsByPage = await Visitor.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$page',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Recent visits (last 10)
    const recentVisits = await Visitor.find(query)
      .sort({ timestamp: -1 })
      .limit(10)
      .select('ip page timestamp userAgent')
      .lean();

    // Visits by day (for chart)
    const visitsByDay = await Visitor.aggregate([
      { $match: query },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$timestamp',
            },
          },
          count: { $sum: 1 },
          unique: {
            $addToSet: '$ip',
          },
        },
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          unique: { $size: '$unique' },
        },
      },
      { $sort: { date: 1 } },
    ]);

    return NextResponse.json(
      {
        totalVisits,
        uniqueVisitors: uniqueVisitors.length,
        visitsByPage,
        recentVisits,
        visitsByDay,
        period,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching visitor stats:', error);
    return NextResponse.json(
      { error: error.message || 'Server error' },
      { status: 500 }
    );
  }
}


