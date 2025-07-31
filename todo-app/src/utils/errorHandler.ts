interface ErrorResponse {
  error: string;
  details: string;
  timestamp: string;
  endpoint: string;
}

export function handleDatabaseError(error: unknown, endpoint: string): ErrorResponse {
  console.error(`Error in ${endpoint}:`, error);
  
  let errorMessage = `Failed to process request at ${endpoint}`;
  let errorDetails = "Unknown error occurred";
  
  if (error instanceof Error) {
    errorDetails = error.message;
    
    // エラーメッセージから原因を推測
    if (error.message.includes('no such table')) {
      errorMessage = "Database table not found";
      errorDetails = "The 'todos' table does not exist. Please run migrations first.";
    } else if (error.message.includes('database is locked')) {
      errorMessage = "Database is locked";
      errorDetails = "Another operation is currently using the database.";
    } else if (error.message.includes('disk full')) {
      errorMessage = "Database storage full";
      errorDetails = "No space left on device.";
    } else if (error.message.includes('permission denied')) {
      errorMessage = "Database permission denied";
      errorDetails = "Insufficient permissions to access the database.";
    } else if (error.message.includes('connection')) {
      errorMessage = "Database connection failed";
      errorDetails = "Unable to connect to the database.";
    } else if (error.message.includes('timeout')) {
      errorMessage = "Database operation timeout";
      errorDetails = "The database operation took too long to complete.";
    } else if (error.message.includes('UNIQUE constraint failed')) {
      errorMessage = "Duplicate entry";
      errorDetails = "A record with the same unique identifier already exists.";
    } else if (error.message.includes('NOT NULL constraint failed')) {
      errorMessage = "Missing required field";
      errorDetails = "A required field is missing or null.";
    } else if (error.message.includes('FOREIGN KEY constraint failed')) {
      errorMessage = "Referential integrity error";
      errorDetails = "The referenced record does not exist.";
    } else if (error.message.includes('CHECK constraint failed')) {
      errorMessage = "Validation error";
      errorDetails = "The data does not meet the validation requirements.";
    } else if (error.message.includes('syntax error')) {
      errorMessage = "SQL syntax error";
      errorDetails = "There is a syntax error in the SQL query.";
    } else if (error.message.includes('no such column')) {
      errorMessage = "Column not found";
      errorDetails = "The specified column does not exist in the table.";
    }
  }
  
  // エラーの型に応じた詳細情報を追加
  const errorType = error?.constructor?.name || 'Unknown';
  const fullDetails = `${errorDetails} (Error Type: ${errorType})`;
  
  return {
    error: errorMessage,
    details: fullDetails,
    timestamp: new Date().toISOString(),
    endpoint
  };
}

export function handleDatabaseConnectionError(): ErrorResponse {
  console.error('Database connection failed: DB binding is not available');
  return {
    error: "Database connection failed",
    details: "DB binding is not available",
    timestamp: new Date().toISOString(),
    endpoint: "unknown"
  };
} 