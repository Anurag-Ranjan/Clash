class Env {
  static API_AUTH_BASE_URL = `${process.env.API_BASE_URL}/api/v1/auth`;
  static REGISTER_ROUTE = `${Env.API_AUTH_BASE_URL}/register`;
  static LOGIN_ROUTE = `${Env.API_AUTH_BASE_URL}/login`;
  static CHECK_ROUTE = `${Env.API_AUTH_BASE_URL}/check/credentials`;
}

export default Env;
