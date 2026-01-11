
import { NextResponse } from 'next/server';

export function successResponse(data, status = 200) {
  return NextResponse.json({
    success: true,
    data
  }, { status });
}

export function errorResponse(message, status = 400) {
  return NextResponse.json({
    success: false,
    error: message
  }, { status });
}

export function unauthorizedResponse() {
  return NextResponse.json({
    success: false,
    error: 'Unauthorized - Admin access required'
  }, { status: 403 });
}