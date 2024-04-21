import countries from "world-countries";

// format country values
const formatedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  // get all formated values action
  const getAll = () => formatedCountries;

  // get the country action base on the provided/selected country
  const getByValue = (value: string) => {
    return formatedCountries.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
