export default function convert(temp, country) {
    if (imperials.includes(country)) {
        temp = (temp * 9/5) + 32
        return Math.round(temp)}
    } 
    return Math.round(temp)
}

const imperials = [
    'United States',
    'Bahamas',
    'Cayman Islands',
    'Liberia',
    'Palau',
    'The Federated States of Micronesia',
    'Marshall Islands',
  ]