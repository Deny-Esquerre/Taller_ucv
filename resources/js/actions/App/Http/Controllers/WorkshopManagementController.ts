import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\WorkshopManagementController::index
 * @see app/Http/Controllers/WorkshopManagementController.php:13
 * @route '/workshops/manage'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/workshops/manage',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WorkshopManagementController::index
 * @see app/Http/Controllers/WorkshopManagementController.php:13
 * @route '/workshops/manage'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopManagementController::index
 * @see app/Http/Controllers/WorkshopManagementController.php:13
 * @route '/workshops/manage'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WorkshopManagementController::index
 * @see app/Http/Controllers/WorkshopManagementController.php:13
 * @route '/workshops/manage'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\WorkshopManagementController::store
 * @see app/Http/Controllers/WorkshopManagementController.php:22
 * @route '/workshops/manage'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/workshops/manage',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WorkshopManagementController::store
 * @see app/Http/Controllers/WorkshopManagementController.php:22
 * @route '/workshops/manage'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopManagementController::store
 * @see app/Http/Controllers/WorkshopManagementController.php:22
 * @route '/workshops/manage'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\WorkshopManagementController::destroy
 * @see app/Http/Controllers/WorkshopManagementController.php:46
 * @route '/workshops/manage/{blockedDay}'
 */
export const destroy = (args: { blockedDay: number | { id: number } } | [blockedDay: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/workshops/manage/{blockedDay}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\WorkshopManagementController::destroy
 * @see app/Http/Controllers/WorkshopManagementController.php:46
 * @route '/workshops/manage/{blockedDay}'
 */
destroy.url = (args: { blockedDay: number | { id: number } } | [blockedDay: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { blockedDay: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { blockedDay: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    blockedDay: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        blockedDay: typeof args.blockedDay === 'object'
                ? args.blockedDay.id
                : args.blockedDay,
                }

    return destroy.definition.url
            .replace('{blockedDay}', parsedArgs.blockedDay.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopManagementController::destroy
 * @see app/Http/Controllers/WorkshopManagementController.php:46
 * @route '/workshops/manage/{blockedDay}'
 */
destroy.delete = (args: { blockedDay: number | { id: number } } | [blockedDay: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const WorkshopManagementController = { index, store, destroy }

export default WorkshopManagementController