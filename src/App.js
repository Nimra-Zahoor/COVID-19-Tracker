import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import { useEffect, useState } from 'react';
import InfoBox from './components/InfoBox';
import Table from './components/Table';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [info, setInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(res => res.json())
      .then(data => {
        setInfo(data);
      });
  }, [])

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(res => res.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso3
          }));

          setCountries(countries);
          setTableData(data);
        })
    }

    getCountries();
  }, [])

  const countryChange = async (e) => {
    const countryName = e.target.value;

    const url = countryName === "Worldwide"
      ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryName}`

    await fetch(url)
      .then(res => res.json())
      .then(data => {
        setCountry(countryName);
        setInfo(data);
      })

  }

  return (
    <div className="app">
      <div className="app_header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={countryChange}
          >
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {
              countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }

          </Select>
        </FormControl>
      </div>

      <div className="app_body">
        <div className="app_boxes">
          <InfoBox title="Total Cases" cases={info.todayCases} total={info.cases} />
          <InfoBox title="Recovered Cases" cases={info.todayRecovered} total={info.recovered} />
          <InfoBox title="Deaths" cases={info.todayDeaths} total={info.deaths} />
        </div>

        <Card className="app_list">
          <CardContent>
            <h3>Live Cases of each Country</h3>
            <Table countries={tableData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
