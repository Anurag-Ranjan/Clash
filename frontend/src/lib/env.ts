class Env {
  static API_AUTH_BASE_URL = `${process.env.API_BASE_URL}/api/v1/auth`;
  static REGISTER_ROUTE = `${Env.API_AUTH_BASE_URL}/register`;
}

export default Env;
