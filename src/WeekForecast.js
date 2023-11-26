import moment from 'moment';
import 'moment/locale/et';
import piltSunrise from './pix/sunrise.png';
import piltSunset from './pix/sunset.png';

const formatDate = (date, fmt) => {
    moment.locale('et');
    let ret = moment(date).format(fmt);
    return (ret);
}

const WeekForecast = ({ dailyData, dailyUnits }) => (
    <table cellPadding="10" cellSpacing="0">
        <thead>
            <tr className="zebra">
                <td>Prognoos</td>
                <td><img style={{ width: '50px', padding: '1px' }} src={piltSunrise} /></td>
                <td><img style={{ width: '50px', padding: '1px' }} src={piltSunset} /></td>
                <td>Max/Min {dailyUnits.temperature_2m_max}</td>
                <td>Sademed {dailyUnits.precipitation_probability_max}</td>
                <td>Tuul m/s</td>
            </tr>
        </thead>
        <tbody>
            {
                dailyData.time.map((date, i) => (
                    <tr key={i} className={(i % 2) ? 'zebra' : ''}>
                        {console.log(date)}
                        <td>{formatDate(date, 'dddd D. MMM')}</td>
                        <td>{formatDate(dailyData.sunrise[i], 'HH:mm')}</td>
                        <td>{formatDate(dailyData.sunset[i], 'HH:mm')}</td>
                        <td align="right">{dailyData.temperature_2m_max[i]} / {dailyData.temperature_2m_min[i]}</td>
                        <td align="right">{dailyData.precipitation_probability_max[i]}</td>
                        <td align="right">{parseFloat(dailyData.wind_speed_10m_max[i] * 1000 / 3600, 2).toFixed(1)}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
)

export default WeekForecast;
