const config: {
  development: {
    API_URL: string
  }
  production: {
    API_URL: string
  }
} = {
  development: {
    API_URL: 'http://localhost:3000',
  },
  production: {
    API_URL: 'http://localhost:3000',
  },
}

export default config[import.meta.env.MODE as keyof typeof config]
