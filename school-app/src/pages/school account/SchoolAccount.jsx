import { ArrowDownward, ArrowUpward, Money } from '@mui/icons-material'
import { Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import React from 'react'
import CurrencyFormat from 'react-currency-format'
import PageContent from '../../components/PageContent'
import PageHeader from '../../components/PageHeader'
import Chart from '../../components/charts/Chart'
import { userSalesData } from '../../devData'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  schoolAccount: {},
  topWidget: {
    width: '100%',
    justifyContent: 'space-between',
    padding: theme.spacing(2),
    '& .MuiCard-root': {
      width: '300px',
      color: '#555',
    },
  },
  arrowIcon: {
    fontSize: '14px',
    margin: 'auto 8px',
  },
}))

function SchoolAccount() {
  const classes = useStyles()

  return (
    <div>
      <PageHeader
        icon={<Money fontSize='large' style={{ color: '#22B14C' }} />}
        title='School Account'
        subtitle={'Account Summary'}
      />
      <PageContent>
        <div className={classes.schoolAccount}>
          <Stack
            direction={'row'}
            justifyContent='space-between'
            className={`${classes.topWidget} shadowed`}
          >
            <Card>
              <CardHeader title='Total' />
              <CardContent>
                <CurrencyFormat
                  renderText={(value) => (
                    <Typography variant='h5' component={'div'}>
                      {value}
                    </Typography>
                  )}
                  decimalScale={2}
                  value={2500983.87}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix='₦'
                />
                <Typography
                  variant='subtitle1'
                  color={true ? 'primary' : 'secondary'}
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    fontSize: '14px',
                  }}
                >
                  +12.5% <ArrowUpward className={classes.arrowIcon} />
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title='Total' />
              <CardContent>
                <CurrencyFormat
                  renderText={(value) => (
                    <Typography variant='h5' component={'div'}>
                      {value}
                    </Typography>
                  )}
                  decimalScale={2}
                  value={2500983.87}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix='₦'
                />
                <Typography
                  variant='subtitle1'
                  color={false ? 'primary' : 'secondary'}
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    fontSize: '14px',
                  }}
                >
                  -1.5%
                  <ArrowDownward className={classes.arrowIcon} />{' '}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title='Total' />
              <CardContent>
                <CurrencyFormat
                  renderText={(value) => (
                    <Typography variant='h5' component={'div'}>
                      {value}
                    </Typography>
                  )}
                  decimalScale={2}
                  value={2500983.87}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix='₦'
                />
                <Typography
                  variant='subtitle1'
                  color={true ? 'primary' : 'secondary'}
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    fontSize: '14px',
                  }}
                >
                  +12.5% <ArrowUpward className={classes.arrowIcon} />
                </Typography>
              </CardContent>
            </Card>
          </Stack>
          <Chart
            data={userSalesData}
            datakey={'Active User'}
            grid
            title='User Analytics'
          />
        </div>
      </PageContent>
    </div>
  )
}

export default SchoolAccount
