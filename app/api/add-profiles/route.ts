import { supabase } from "../../../lib/supabseClient";
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userId, username, role } = await req.json();

  const { error } = await supabase.from('profiles').insert({
    id: userId,
    username,
    role,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ message: 'Profile created successfully' });
}
