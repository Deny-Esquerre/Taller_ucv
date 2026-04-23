import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
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
* @see \App\Http\Controllers\WorkshopManagementController::store
 * @see app/Http/Controllers/WorkshopManagementController.php:22
 * @route '/workshops/manage'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WorkshopManagementController::store
 * @see app/Http/Controllers/WorkshopManagementController.php:22
 * @route '/workshops/manage'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
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

    /**
* @see \App\Http\Controllers\WorkshopManagementController::destroy
 * @see app/Http/Controllers/WorkshopManagementController.php:46
 * @route '/workshops/manage/{blockedDay}'
 */
    const destroyForm = (args: { blockedDay: number | { id: number } } | [blockedDay: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WorkshopManagementController::destroy
 * @see app/Http/Controllers/WorkshopManagementController.php:46
 * @route '/workshops/manage/{blockedDay}'
 */
        destroyForm.delete = (args: { blockedDay: number | { id: number } } | [blockedDay: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const manage = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default manage