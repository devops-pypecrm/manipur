import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI environment variable is not defined.');
  console.error('Please make sure .env.local exists with MONGODB_URI.');
  process.exit(1);
}

// User schema definition matching src/models/User.js
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

const adminData = {
  name: process.env.ADMIN_NAME || 'MIU Admin',
  email: (process.env.ADMIN_EMAIL || 'admin@miu.edu.in').toLowerCase().trim(),
  password: process.env.ADMIN_PASSWORD || 'Admin@12345',
  role: 'admin',
};

async function seedAdmin() {
  console.log('🔄 Connecting to MongoDB...');
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('✅ Connected to MongoDB successfully.');

    // Check if admin user already exists
    const existing = await User.findOne({ email: adminData.email });

    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    if (existing) {
      existing.name = adminData.name;
      existing.password = hashedPassword;
      existing.role = 'admin';
      await existing.save();

      console.log('\n======================================');
      console.log('🎉 Existing Admin Account Updated!');
      console.log('======================================');
    } else {
      await User.create({
        name: adminData.name,
        email: adminData.email,
        password: hashedPassword,
        role: adminData.role,
      });

      console.log('\n======================================');
      console.log('🎉 Admin Account Created Successfully!');
      console.log('======================================');
    }

    console.log(`👤 Name:     ${adminData.name}`);
    console.log(`📧 Email:    ${adminData.email}`);
    console.log(`🔑 Password: ${adminData.password}`);
    console.log(`🛡️  Role:     ${adminData.role}`);
    console.log('🔗 Login at: http://localhost:3000/admin/login');
    console.log('======================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Failed to seed admin user:');
    if (error.message?.includes('Could not connect to any servers') || error.message?.includes('SSL alert number 80')) {
      console.error('⚠️  MongoDB Atlas IP Access error:');
      console.error('Your current public IP is not whitelisted in MongoDB Atlas Network Access.');
      console.error('To whitelist:');
      console.error(' 1. Go to MongoDB Atlas (https://cloud.mongodb.com/)');
      console.error(' 2. Navigate to "Security" -> "Network Access"');
      console.error(' 3. Click "Add IP Address" and add your current IP or allow access from anywhere (0.0.0.0/0).');
    } else {
      console.error(error.message || error);
    }
    process.exit(1);
  }
}

seedAdmin();
