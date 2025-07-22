import LS from '@/api/impl/ds/LocalStorage'
import RepoImpl from '@/api/impl/repo/DataRepo'

const DataRepo = new RepoImpl(new LS())

export default DataRepo
