import { NextResponse } from 'next/server';
import { generateSprintPlan, FounderIntake } from '@/lib/matcher';

export async function POST(request: Request) {
  try {
    const intake: FounderIntake = await request.json();

    // Basic validation
    const requiredFields: (keyof FounderIntake)[] = [
      'productName',
      'productDescription',
      'targetAudience',
      'goal',
      'budget',
      'timeline',
      'platforms',
    ];

    for (const field of requiredFields) {
      if (!intake[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const sprintPlan = generateSprintPlan(intake);
    return NextResponse.json(sprintPlan);
  } catch (error) {
    console.error('[API/SPRINT] Error generating sprint plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate sprint plan.' },
      { status: 500 }
    );
  }
}
