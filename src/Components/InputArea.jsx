import { Grid, Autocomplete, Button, TextField } from '@mui/material'
import { statesData, categories } from '../autoCompleteData.js'

const InputArea = ({
    setCategory,
    category,
    setCity,
    city,
    setDistrict,
    district,
    setStreet,
    street,
    handleScrapeRequest,
    buttonDisabled,
}) => {
    const handleCategoryChange = (event, newCategoryValue) => {
        setCategory(newCategoryValue)
    }

    const handleCityChange = (event, newCityValue) => {
        setDistrict(null)
        setStreet(null)
        setCity(newCityValue)
    }

    const handleDistrictChange = (event, newDistrictValue) => {
        setStreet(null)
        setDistrict(newDistrictValue)
    }

    const handleStreetChange = (event, newStreetValue) => {
        setStreet(newStreetValue)
    }

    return (
        <Grid
            container
            alignItems="flex-start"
            justifyContent="center"
            spacing={2}
        >
            <Grid
                item
                xs={9}
                xl={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Autocomplete
                    id="category-picker"
                    options={categories ? categories : []}
                    size="small"
                    sx={{ width: '100%' }}
                    disablePortal={true}
                    autoComplete={true}
                    autoHighlight={true}
                    onChange={(event, newCategoryValue) =>
                        handleCategoryChange(event, newCategoryValue)
                    }
                    value={category}
                    renderInput={(params) => (
                        <TextField {...params} label="Pick a category" />
                    )}
                />
            </Grid>
            <Grid
                item
                xs={9}
                xl={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Autocomplete
                    id="city-picker"
                    options={Object.keys(statesData)}
                    size="small"
                    sx={{ width: '100%' }}
                    disablePortal={true}
                    autoComplete={true}
                    autoHighlight={true}
                    onChange={(event, newCityValue) =>
                        handleCityChange(event, newCityValue)
                    }
                    value={city}
                    renderInput={(params) => (
                        <TextField {...params} label="Pick a city" />
                    )}
                />
            </Grid>
            <Grid
                item
                xs={9}
                xl={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Autocomplete
                    id="district-picker"
                    options={
                        city !== null && Object.keys(statesData[city])
                            ? Object.keys(statesData[city])
                            : []
                    }
                    size="small"
                    sx={{ width: '100%' }}
                    disablePortal={true}
                    autoComplete={true}
                    autoHighlight={true}
                    onChange={(event, newDistrictValue) =>
                        handleDistrictChange(event, newDistrictValue)
                    }
                    value={district}
                    renderInput={(params) => (
                        <TextField {...params} label="Pick a district" />
                    )}
                />
            </Grid>
            <Grid
                item
                xs={9}
                xl={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Autocomplete
                    id="street-picker"
                    options={
                        city !== null &&
                        district !== null &&
                        statesData[city][district]
                            ? statesData[city][district]
                            : []
                    }
                    size="small"
                    sx={{ width: '100%' }}
                    disablePortal={true}
                    autoComplete={true}
                    autoHighlight={true}
                    onChange={(event, newStreetValue) =>
                        handleStreetChange(event, newStreetValue)
                    }
                    value={street}
                    renderInput={(params) => (
                        <TextField {...params} label="Pick a street" />
                    )}
                />
            </Grid>
            <Grid
                item
                xs={9}
                xl={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button
                    variant="outlined"
                    size="small"
                    sx={{ width: '100%', fontSize: 18.3 }}
                    color="info"
                    onClick={async () => {
                        await handleScrapeRequest()
                    }}
                    disabled={buttonDisabled}
                >
                    Scrape
                </Button>
            </Grid>
        </Grid>
    )
}

export default InputArea
