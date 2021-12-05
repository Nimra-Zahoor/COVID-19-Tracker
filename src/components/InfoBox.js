import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography className="title" color="textSecondary">{title}</Typography>
                    <h3 className="cases">{cases}</h3>
                    <Typography className="total" color="textSecondary">{total}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default InfoBox
