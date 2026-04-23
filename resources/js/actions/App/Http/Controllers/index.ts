import DashboardController from './DashboardController'
import UserController from './UserController'
import PermissionController from './PermissionController'
import WorkshopManagementController from './WorkshopManagementController'
import WorkshopController from './WorkshopController'
import WorkshopHistoryController from './WorkshopHistoryController'
import Settings from './Settings'
const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
UserController: Object.assign(UserController, UserController),
PermissionController: Object.assign(PermissionController, PermissionController),
WorkshopManagementController: Object.assign(WorkshopManagementController, WorkshopManagementController),
WorkshopController: Object.assign(WorkshopController, WorkshopController),
WorkshopHistoryController: Object.assign(WorkshopHistoryController, WorkshopHistoryController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers