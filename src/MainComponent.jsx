import axios from 'axios'
import { useState } from 'react'
// import { MockData } from './MockData/MockData.js'
import DataGridComponent from './Components/DataGridArea.jsx'
import {
    Grid,
    LinearProgress,
    Box,
    Typography,
    Button,
    Switch,
} from '@mui/material'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import InputArea from './Components/InputArea.jsx'
import responseCodes from './responseCodes.js'

const LinearProgressWithLabel = (props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress color="info" variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    )
}

const MainComponent = () => {
    let [category, setCategory] = useState(null)
    let [city, setCity] = useState(null)
    let [district, setDistrict] = useState(null)
    let [street, setStreet] = useState(null)

    let [totalResultsCount, setTotalResultsCount] = useState(-1)
    let [progress, setProgress] = useState(0)
    let [datagridLoading, setDatagridLoading] = useState(false)

    let [data, setData] = useState([])
    let [augmentData, setAugmentData] = useState(false)

    let [downloading, setDownloading] = useState(false)

    const cleanUp = () => {
        setTotalResultsCount(-1)
        setProgress(0)
        setDatagridLoading(false)
    }

    const handleScrapeRequest = async () => {
        if (!category || !city || !district)
            return toast.error('Please fill all the fields')

        const socket = new WebSocket('wss://bulurum-scrape.onrender.com')

        socket.onopen = () => {
            console.log('Connected to server')
        }

        socket.onclose = () => {
            console.log('Disconnected from server')
        }

        socket.onerror = (error) => {
            console.log('Error: ', error)
        }

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log(data)
            if (data.code === responseCodes['BROWSER_INITIATED'])
                toast.success(data.payload.message)
            else if (data.code === responseCodes['BROWSER_INITIATION_FAILED'])
                toast.error(data.payload.message)
            else if (data.code === responseCodes['BROWSER_CLOSED'])
                toast.success(data.payload.message)
            else if (data.code === responseCodes['BROWSER_CLOSING_FAILED'])
                toast.error(data.payload.message)
            else if (data.code === responseCodes['RECAPTCHA_FOUND'])
                toast.info(data.payload.message)
            else if (data.code === responseCodes['RECAPTCHA_SOLVED'])
                toast.success(data.payload.message)
            else if (data.code === responseCodes['RECAPTCHA_SOLVING_FAILED'])
                toast.error(data.payload.message)
            else if (data.code === responseCodes['TOTAL_RESULTS_COUNT']) {
                setTotalResultsCount(data.payload.totalResultsCount)
            } else if (
                data.code === responseCodes['INDIVIDUAL_LINKS_PAGE_SCRAPED']
            )
                toast.success(data.payload.message)
            else if (
                data.code ===
                responseCodes['INDIVIDUAL_LINKS_PAGE_SCRAPING_FAILED']
            )
                toast.error(data.payload.message)
            else if (data.code === responseCodes['INDIVIDUAL_ENTITY_SCRAPED']) {
                setProgress((oldProgress) => {
                    if (oldProgress === totalResultsCount)
                        return totalResultsCount
                    return oldProgress + 1
                })
            }
        }
        console.log(category, city, district, street)
        const URL = `https://bulurum-scrape.onrender.com/?category=${category}&city=${city}&district=${district} ${street}`
        console.log(URL)
        setDatagridLoading(true)
        const response = await axios.get(URL)
        console.log(response.data)

        toast.success('Scraping finished successfully')
        if (response.data.code === responseCodes['NO_RESULTS_FOUND']) {
            toast.error(response.data.payload.message)
        }
        if (augmentData === true) {
            let augmentedData = data.concat(response.data.payload.data)
            setData(augmentedData)
        } else {
            setData(response.data.payload.data)
        }

        cleanUp()

        socket.close()
    }

    const downloadExcel = async (e) => {
        if (downloading === true) return
        if (data.length === 0) return toast.error('No data to download')
        setDownloading(true)
        const ws = XLSX.utils.json_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
        XLSX.writeFile(wb, 'data.xlsx')

        toast.success('Excel file downloaded successfully')
        setDownloading(false)
    }

    return (
        <Grid
            container
            direction="row"
            alignItems="flex-start" // Align items vertically in the center
            justifyContent="center"
            sx={{ height: '100vh' }}
        >
            <Grid
                item
                xs={12}
                sx={{
                    backgroundColor: '#e0e0e0',
                    height: '35vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <InputArea
                    setCategory={setCategory}
                    category={category}
                    setCity={setCity}
                    city={city}
                    setDistrict={setDistrict}
                    district={district}
                    setStreet={setStreet}
                    street={street}
                    handleScrapeRequest={handleScrapeRequest}
                    buttonDisabled={datagridLoading}
                />
            </Grid>

            <Grid
                item
                xs={12}
                sx={{
                    backgroundColor: '#e0e0e0',
                    height: '65vh',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                }}
            >
                <Grid
                    container
                    alignItems="flex-start"
                    justifyContent="center"
                    height={'85%'}
                >
                    <Grid
                        item
                        mt={2}
                        xs={10}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Box sx={{ width: '100%' }}>
                            {progress > 0 ? (
                                <LinearProgressWithLabel
                                    value={(progress / totalResultsCount) * 100}
                                />
                            ) : (
                                <></>
                            )}
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={10}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                            '& .header-theme': {
                                backgroundColor: '#9e9e9e',
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                borderRight: '1px solid #424242',
                            },
                        }}
                    >
                        <DataGridComponent
                            data={data}
                            loading={datagridLoading}
                        />
                    </Grid>

                    <Grid
                        item
                        mt={2}
                        xs={10}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Switch
                            sx={{
                                marginLeft: 'auto',
                            }}
                            color="info"
                            disabled={datagridLoading}
                            checked={augmentData}
                            onChange={(e) => {
                                if (e.target.checked === true)
                                    toast.info('Data will be augmented')
                                else toast.info('Data will be replaced')
                                setAugmentData(e.target.checked)
                            }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Button
                                variant="contained"
                                color="info"
                                size="small"
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    borderRadius: '0px',
                                    marginLeft: 'auto',
                                    display: 'flex',
                                }}
                                disabled={downloading}
                                onClick={downloadExcel}
                            >
                                Download Excel
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default MainComponent
