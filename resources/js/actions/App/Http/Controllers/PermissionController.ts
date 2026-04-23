import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PermissionController::index
 * @see app/Http/Controllers/PermissionController.php:14
 * @route '/permissions'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/permissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PermissionController::index
 * @see app/Http/Controllers/PermissionController.php:14
 * @route '/permissions'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermissionController::index
 * @see app/Http/Controllers/PermissionController.php:14
 * @route '/permissions'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PermissionController::index
 * @see app/Http/Controllers/PermissionController.php:14
 * @route '/permissions'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PermissionController::update
 * @see app/Http/Controllers/PermissionController.php:29
 * @route '/permissions'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/permissions',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PermissionController::update
 * @see app/Http/Controllers/PermissionController.php:29
 * @route '/permissions'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PermissionController::update
 * @see app/Http/Controllers/PermissionController.php:29
 * @route '/permissions'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})
const PermissionController = { index, update }

export default PermissionController