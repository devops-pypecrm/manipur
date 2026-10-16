import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

// GET /api/seed/admin - Check if any admin exists
export async function GET() {
  try {
    await dbConnect();
    const count = await User.countDocuments({ role: 'admin' });
    const users = await User.find({ role: 'admin' }).select('name email role createdAt');
    return NextResponse.json({
      adminCount: count,
      admins: users,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to query admin status', details: error.message },
      { status: 500 }
    );
  }
}

// POST /api/seed/admin - Seed or update default admin user
export async function POST(request) {
  try {
    await dbConnect();

    let body = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const name = body.name || process.env.ADMIN_NAME || 'MIU Admin';
    const email = (body.email || process.env.ADMIN_EMAIL || 'admin@miu.edu.in').toLowerCase().trim();
    const password = body.password || process.env.ADMIN_PASSWORD || 'Admin@12345';
    const role = 'admin';

    let user = await User.findOne({ email });

    if (user) {
      user.name = name;
      user.password = password; // The User model pre('save') hook will hash this password
      user.role = role;
      await user.save();

      return NextResponse.json({
        message: 'Admin account updated successfully',
        admin: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    user = await User.create({
      name,
      email,
      password, // The User model pre('save') hook will hash this password
      role,
    });

    return NextResponse.json(
      {
        message: 'Admin account seeded successfully',
        admin: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error seeding admin user:', error);
    return NextResponse.json(
      { error: 'Failed to seed admin user', details: error.message },
      { status: 500 }
    );
  }
}
