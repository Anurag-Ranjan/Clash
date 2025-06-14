class Env {
  static API_AUTH_BASE_URL = `${process.env.API_BASE_URL}/api/v1/auth`;
  static API_PASSWORD_BASE_URL = `${process.env.API_BASE_URL}/api/v1/password`;
  static REGISTER_ROUTE = `${Env.API_AUTH_BASE_URL}/register`;
  static LOGIN_ROUTE = `${Env.API_AUTH_BASE_URL}/login`;
  static CHECK_ROUTE = `${Env.API_AUTH_BASE_URL}/check/credentials`;
  static FORGOT_PASSWORD_ROUTE = `${Env.API_PASSWORD_BASE_URL}/forgotpassword`;
  static RESET_PASSWORD_ROUTE = `${Env.API_PASSWORD_BASE_URL}/resetPassword`;
}

export default Env;
