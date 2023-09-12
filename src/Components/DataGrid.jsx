import { DataGrid } from '@mui/x-data-grid'
import { toast } from 'react-toastify'

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'companyName',
        headerName: 'Company Name',
        width: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'professions',
        headerName: 'Professions',
        width: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'address',
        headerName: 'Address',
        width: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'primaryPhone',
        headerName: 'Primary Phone',
        width: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'secondaryPhone',
        headerName: 'Secondary Phone',
        width: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'websiteLink',
        headerName: 'Website Link',
        width: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 200,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'instagram',
        headerName: 'Instagram',
        width: 200,
        headerAlign: 'center',
        align: 'center',
    },
]

const DataGridComponent = ({ loading, data }) => {
    return (
        <DataGrid
            loading={loading}
            rows={data}
            columns={columns}
            rowsPerPage={6}
            autoHeight
            checkboxSelection
            getRowHeight={() => 'auto'}
            density="comfortable"
            disableRowSelectionOnClick
            onClipboardCopy={() => toast.success('Copied to clipboard')}
        />
    )
}

export default DataGridComponent
