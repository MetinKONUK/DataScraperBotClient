import axios from 'axios'
import { useEffect, useState } from 'react'
// import { MockData } from './MockData/MockData.js'
import DataGridComponent from './Components/DataGrid.jsx'
import { Box, Grid, TextField, Button } from '@mui/material'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import rightArrow from './static/icons/right-arrow.png'

const MainComponent = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [categoryName, setCategoryName] = useState(undefined)
    const [cityName, setCityName] = useState(undefined)
    const [districtName, setDistrictName] = useState(undefined)

    const [downloading, setDownloading] = useState(false)

    useEffect(() => {
        // fetch data from database here
    }, [])

    const handleSubmit = async (e) => {
        if (loading === true) return
        console.log(categoryName, cityName, districtName)
        if (categoryName === undefined)
            return toast.error('Category name is required')
        if (cityName === undefined) return toast.error('City name is required')
        if (districtName === undefined)
            return toast.error('District name is required')

        setLoading(true)
        try {
            // setData(MockData.data)
            const URL = `https://bulurum-scrape.onrender.com?category=${categoryName}&city=${cityName}&district=${districtName}`
            const response = await axios.get(URL)
            console.log(response.data.data)
            setData(response.data.data)

            setLoading(false)
            toast.success('Data loaded successfully')
        } catch (error) {
            toast.error('Error in fetching data: ', error)
            setLoading(false)
        }
    }

    const downloadExcel = (e) => {
        e.preventDefault()
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
            justifyContent="center" // Center items horizontally
            alignItems="center" // Center items vertically
            style={{ height: '100vh' }}
        >
            <Grid
                item
                xs={12}
                style={{
                    height: '25%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#eeeeee',
                }}
            >
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        label="Category Name"
                        color="success"
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <TextField
                        label="City Name"
                        color="success"
                        onChange={(e) => setCityName(e.target.value)}
                    />
                    <TextField
                        label="District Name"
                        color="success"
                        onChange={(e) => setDistrictName(e.target.value)}
                    />
                    <img
                        onClick={(e) => handleSubmit(e)}
                        src={rightArrow}
                        alt="Continue"
                        style={{
                            marginTop: '1vh',
                            width: '5vh',
                            cursor: 'pointer',
                        }}
                    />
                </Box>
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    height: '75%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#eeeeee',
                }}
            >
                <Box style={{ width: '90%' }}>
                    <DataGridComponent loading={loading} data={data} />
                    <Box
                        mt={2}
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        <Button
                            onClick={(e) => downloadExcel(e)}
                            color="success"
                            variant="outlined"
                            size="large"
                            loading={downloading}
                        >
                            Download
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default MainComponent
