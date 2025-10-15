import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { files } = await request.json();

    if (!files || !Array.isArray(files)) {
      return NextResponse.json({ error: 'Files array is required' }, { status: 400 });
    }

    // Return files data - the client will handle ZIP creation
    return NextResponse.json({ files });
  } catch (error: unknown) {
    console.error('Error exporting files:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to export files';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

