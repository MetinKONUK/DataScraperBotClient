import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header-theme',
    },
    {
        field: 'companyName',
        headerName: 'Company Name',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header-theme',
    },
    {
        field: 'professions',
        headerName: 'Professions',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header-theme',
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header-theme',
    },
    {
        field: 'primaryPhone',
        headerName: 'Primary Phone',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header-theme',
    },
    {
        field: 'secondaryPhone',
        headerName: 'Secondary Phone',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header-theme',
    },
    {
        field: 'websiteLink',
        headerName: 'Website Link',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header-theme',
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header-theme',
    },
    {
        field: 'instagram',
        headerName: 'Instagram',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header-theme',
    },
    {
        field: 'facebook',
        headerName: 'Facebook',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header-theme',
    },
    {
        field: 'mapLink',
        headerName: 'Map Link',
        width: 200,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header-theme',
    },
]

const DataGridComponent = ({ loading, data }) => {
    return (
        <DataGrid
            sx={{ border: 0.2, borderColor: '#9e9e9e', borderRadius: 2 }}
            loading={loading}
            rows={data ?? []}
            columns={columns}
            getRowHeight={() => 'auto'}
            density="compact"
            disableRowSelectionOnClick
            onClipboardCopy={() => toast.success('Copied to clipboard')}
            checkboxSelection={false}
        />
    )
}

export default DataGridComponent
