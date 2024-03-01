'use strict';

const Status = {
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    EARLYHINTS: 103,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    AMBIGUOUS: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNSUPPORTED_ACTION: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    I_AM_A_TEAPOT: 418,
    MISDIRECTED: 421,
    VALIDATION_FAILED: 422,
    FAILED_DEPENDENCY: 424,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505
};

function statusMessage(status) {
  switch (status) {
    case Status.BAD_REQUEST:
      return 'Bad Request';
    case Status.UNAUTHORIZED:
      return 'Unauthorized';
    case Status.FORBIDDEN:
      return 'Forbidden';
    case Status.NOT_FOUND:
      return 'Not Found';
    case Status.UNSUPPORTED_ACTION:
      return 'Unsupported Action';
    case Status.VALIDATION_FAILED:
      return 'Validation Failed';
    case Status.SERVER_ERROR:
      return 'Internal Server Error';
    case status.CREATED:
      return 'Created';
  }
}

function jsonResponse(res, body, options) {
  options = options || {};
  options.status = options.status || Status.OK;
  res.status(options.status).json(body || null);
}

const Api = {
  ok: function (res, data) {
    jsonResponse(res, data, {
      status: Status.OK,
    });
  },

  badRequest: function (res, errors) {
    errors = Array.isArray(errors) ? errors : [errors];

    const body = {
      message: statusMessage(Status.BAD_REQUEST),
      errors: errors,
    };

    jsonResponse(res, body, {
      status: Status.BAD_REQUEST,
    });
  },

  unauthorized: function (res, error) {
    const body = {
      message: statusMessage(Status.UNAUTHORIZED),
      error: error,
    };

    jsonResponse(res, body, {
      status: Status.UNAUTHORIZED,
    });
  },

  forbidden: function (res) {
    const body = {
      message: statusMessage(Status.FORBIDDEN),
    };

    jsonResponse(res, body, {
      status: Status.FORBIDDEN,
    });
  },
  notFound: function (res) {
    const body = {
      message: statusMessage(Status.NOT_FOUND),
    };

    jsonResponse(res, body, {
      status: Status.NOT_FOUND,
    });
  },

  unsupportedAction: function (res) {
    const body = {
      message: statusMessage(Status.UNSUPPORTED_ACTION),
    };

    jsonResponse(res, body, {
      status: Status.UNSUPPORTED_ACTION,
    });
  },

  invalid: function (res, errors) {
    errors = Array.isArray(errors) ? errors : [errors];

    const body = {
      message: statusMessage(Status.VALIDATION_FAILED),
      errors: errors,
    };

    jsonResponse(res, body, {
      status: Status.VALIDATION_FAILED,
    });
  },
  serverError: function (res, error) {
    if (error instanceof Error) {
      error = {
        message: error.message,
        stacktrace: error.stack,
      };
    }
    const body = {
      message: statusMessage(Status.SERVER_ERROR),
      error: error,
    };

    jsonResponse(res, body, {
      status: Status.SERVER_ERROR,
    });
  },
  created: function (res, data) {
    jsonResponse(res, data, {
      status: Status.OK,
    });
  },
  continue: function (res) {
    const body = {
      message: statusMessage(Status.CONTINUE),
    };

    jsonResponse(res, body, {
      status: Status.CONTINUE,
    });
  },

  switchingProtocols: function (res) {
    const body = {
      message: statusMessage(Status.SWITCHING_PROTOCOLS),
    };

    jsonResponse(res, body, {
      status: Status.SWITCHING_PROTOCOLS,
    });
  },

  processing: function (res) {
    const body = {
      message: statusMessage(Status.PROCESSING),
    };

    jsonResponse(res, body, {
      status: Status.PROCESSING,
    });
  },

  earlyHints: function (res) {
    const body = {
      message: statusMessage(Status.EARLYHINTS),
    };

    jsonResponse(res, body, {
      status: Status.EARLYHINTS,
    });
  },

  // Redirection
  seeOther: function (res) {
    const body = {
      message: statusMessage(Status.SEE_OTHER),
    };

    jsonResponse(res, body, {
      status: Status.SEE_OTHER,
    });
  },

  temporaryRedirect: function (res) {
    const body = {
      message: statusMessage(Status.TEMPORARY_REDIRECT),
    };

    jsonResponse(res, body, {
      status: Status.TEMPORARY_REDIRECT,
    });
  },

  permanentRedirect: function (res) {
    const body = {
      message: statusMessage(Status.PERMANENT_REDIRECT),
    };

    jsonResponse(res, body, {
      status: Status.PERMANENT_REDIRECT,
    });
  },

  // Client Errors
  proxyAuthenticationRequired: function (res) {
    const body = {
      message: statusMessage(Status.PROXY_AUTHENTICATION_REQUIRED),
    };

    jsonResponse(res, body, {
      status: Status.PROXY_AUTHENTICATION_REQUIRED,
    });
  },

  requestedRangeNotSatisfiable: function (res) {
    const body = {
      message: statusMessage(Status.REQUESTED_RANGE_NOT_SATISFIABLE),
    };

    jsonResponse(res, body, {
      status: Status.REQUESTED_RANGE_NOT_SATISFIABLE,
    });
  },

  expectationFailed: function (res) {
    const body = {
      message: statusMessage(Status.EXPECTATION_FAILED),
    };

    jsonResponse(res, body, {
      status: Status.EXPECTATION_FAILED,
    });
  },

  iAmATeapot: function (res) {
    const body = {
      message: statusMessage(Status.I_AM_A_TEAPOT),
    };

    jsonResponse(res, body, {
      status: Status.I_AM_A_TEAPOT,
    });
  },

  misdirected: function (res) {
    const body = {
      message: statusMessage(Status.MISDIRECTED),
    };

    jsonResponse(res, body, {
      status: Status.MISDIRECTED,
    });
  },

  failedDependency: function (res) {
    const body = {
      message: statusMessage(Status.FAILED_DEPENDENCY),
    };

    jsonResponse(res, body, {
      status: Status.FAILED_DEPENDENCY,
    });
  },

  preconditionRequired: function (res) {
    const body = {
      message: statusMessage(Status.PRECONDITION_REQUIRED),
    };

    jsonResponse(res, body, {
      status: Status.PRECONDITION_REQUIRED,
    });
  },

  tooManyRequests: function (res) {
    const body = {
      message: statusMessage(Status.TOO_MANY_REQUESTS),
    };

    jsonResponse(res, body, {
      status: Status.TOO_MANY_REQUESTS,
    });
  },

  // Server Errors
  notImplemented: function (res) {
    const body = {
      message: statusMessage(Status.NOT_IMPLEMENTED),
    };

    jsonResponse(res, body, {
      status: Status.NOT_IMPLEMENTED,
    });
  },

  badGateway: function (res) {
    const body = {
      message: statusMessage(Status.BAD_GATEWAY),
    };

    jsonResponse(res, body, {
      status: Status.BAD_GATEWAY,
    });
  },

  serviceUnavailable: function (res) {
    const body = {
      message: statusMessage(Status.SERVICE_UNAVAILABLE),
    };

    jsonResponse(res, body, {
      status: Status.SERVICE_UNAVAILABLE,
    });
  },

  gatewayTimeout: function (res) {
    const body = {
      message: statusMessage(Status.GATEWAY_TIMEOUT),
    };

    jsonResponse(res, body, {
      status: Status.GATEWAY_TIMEOUT,
    });
  },

  httpVersionNotSupported: function (res) {
    const body = {
      message: statusMessage(Status.HTTP_VERSION_NOT_SUPPORTED),
    };

    jsonResponse(res, body, {
      status: Status.HTTP_VERSION_NOT_SUPPORTED,
    });
  },

};

export { Api };
