class Environment {
    static getEnvironment() {
        return process.env.NODE_ENV || 'development'; // Default to 'development' if NODE_ENV is not set
    }

    static getServerBaseUrl() {
        return process.env.NODE_ENV === 'production' ? import.meta.env.VITE_PROD_BASE_URL : import.meta.env.VITE_DEV_BASE_URL;
    }
}

export default Environment;