class Env {
  static API_AUTH_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth`;
  static API_PASSWORD_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/password`;
  static API_CLASH_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/clash`;
  static REGISTER_ROUTE = `${Env.API_AUTH_BASE_URL}/register`;
  static LOGIN_ROUTE = `${Env.API_AUTH_BASE_URL}/login`;
  static CHECK_ROUTE = `${Env.API_AUTH_BASE_URL}/check/credentials`;
  static FORGOT_PASSWORD_ROUTE = `${Env.API_PASSWORD_BASE_URL}/forgotpassword`;
  static RESET_PASSWORD_ROUTE = `${Env.API_PASSWORD_BASE_URL}/resetPassword`;
  static CREATE_CLASH_ROUTE = `${Env.API_CLASH_BASE_URL}`;
}

export default Env;
