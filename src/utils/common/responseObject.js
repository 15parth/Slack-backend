export const internalServerError = (error) => {
  return {
    success: false,
    err: error,
    data: [],
    message: 'Internal Server Error'
  }
}

export const customErrorResponse = (error) => {
  if (!error.message && !error.explanation) {
    return internalServerError(error)
  }

  return {
    success: false,
    err: error.explanatoion,
    data: [],
    message: error.message || 'Custom Error'
  }
}

export const successResponse = (data, message) => {
  return {
    success: true,
    err: {},
    data: data || [],
    message
  }
}
