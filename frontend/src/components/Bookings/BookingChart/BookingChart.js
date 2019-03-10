import React from 'react';
import { Bar as BarChart } from 'react-chartjs';
import './BookingChart.css'

const BOOKINGS_BUCKETS = {
    Cheap: {
        min: 0,
        max: 5
    },
    Normal: {
        min: 5,
        max: 25
    },
    Expensive: {
        min: 25,
        max: 1000000
    }
};

const bookingChart = props => {
    const chartData = { labels: [], datasets: [] };
    let values = [];
    for (const bucket in BOOKINGS_BUCKETS) {
        const filteredBookingsCount = props.bookings.reduce((prev, current) => {
            if (
                current.event.price > BOOKINGS_BUCKETS[bucket].min &&
                current.event.price < BOOKINGS_BUCKETS[bucket].max
            ) {
                return prev + 1;
            } else {
                return prev;
            }
        }, 0);
        values.push(filteredBookingsCount);
        chartData.labels.push(bucket);
        chartData.datasets.push({
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,0.1)",
            data: values
        });
        values = [...values];
        values[values.length - 1] = null;
    }

    return (
        <div className="booking-chart">
            <BarChart data={chartData} />
        </div>
    );
};

export default bookingChart;