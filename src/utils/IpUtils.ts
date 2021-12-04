import publicIP from 'react-native-public-ip';

export const getCountryByIp = (ip: string): Promise<string> => {
    return fetch(
        `http://api.ipapi.com/${ip}?access_key=64c6bb9dc59f45ccd49ac1290ad01977&format=1`,
    )
        .then(response => response.json())
        .then((responseJson: { country_name: string }) => {
            console.log('countryName', responseJson?.country_name);
            return Promise.resolve(responseJson?.country_name);
        })
        .catch(error => {
            console.error(error);
            return Promise.reject(error);
        });
};

export const getPublicIp = (): Promise<string> => {
    return publicIP()
        .then((ip: string) => {
            return Promise.resolve(ip);
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};
