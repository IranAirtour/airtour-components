/**
 * required API_BASE_URL(s) and ACCESS_KEY to get ip and it's related country
 */
const IP_API_BASE_URL = 'https://api.ipify.org';
const IP_COUNTRY_BASE_URL = 'http://api.ipapi.com';
const IP_COUNTRY_API_ACCESS_KEY = '64c6bb9dc59f45ccd49ac1290ad01977';

/**
 * get country object based on received ip
 * @param ip
 */
export const getCountryByIp = (ip: string): Promise<string> => {
    return fetch(
        `${IP_COUNTRY_BASE_URL + '/' + ip + '?access_key=' + IP_COUNTRY_API_ACCESS_KEY + '&format=1'}`,
    )
        .then(response => response.json())
        .then((responseJson: { country_name: string }) => {
            console.log('countryName', JSON.stringify(responseJson));
            return Promise.resolve(responseJson?.country_name);
        })
        .catch(error => {
            console.error(error);
            return Promise.reject(error);
        });
};

/**
 * get public ip
 * @param api: using custom api to get public ip
 */
export const getPublicIp = (api?: string): Promise<string> => {
    return fetch(api ?? IP_API_BASE_URL)
        .then(response => response.text())
        .then((ip: string) => {
            console.log('public_ip: ', ip);
            return Promise.resolve(ip);
        })
        .catch(error => {
            console.error(error);
            return Promise.reject(error);
        });
};
