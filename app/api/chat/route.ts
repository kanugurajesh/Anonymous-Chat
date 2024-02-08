import { connect } from '@/dbConfig/route';
import { NextRequest, NextResponse } from 'next/server';
import chatModel from '@/models/chatModel';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, profile, message, image } = reqBody;
    const chat = new chatModel({
      name,
      profile,
      message,
      image,
    });
    console.log('Chat: ', chat);
    await chat.save();
    return NextResponse.json(
      { message: 'Chat saved successfully' },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'There was an error saving the chat' },
      { status: 500 },
    );
  }
}

export async function GET() {
  // return all the chats
  try {
    // fetching all the chats from the database
    const chats = await chatModel.find();
    // returning the chats
    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'There was an error fetching the chats' },
      { status: 500 },
    );
  }
}
