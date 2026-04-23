import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\WorkshopHistoryController::index
 * @see app/Http/Controllers/WorkshopHistoryController.php:12
 * @route '/workshops/history'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/workshops/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WorkshopHistoryController::index
 * @see app/Http/Controllers/WorkshopHistoryController.php:12
 * @route '/workshops/history'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopHistoryController::index
 * @see app/Http/Controllers/WorkshopHistoryController.php:12
 * @route '/workshops/history'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WorkshopHistoryController::index
 * @see app/Http/Controllers/WorkshopHistoryController.php:12
 * @route '/workshops/history'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\WorkshopHistoryController::duplicate
 * @see app/Http/Controllers/WorkshopHistoryController.php:27
 * @route '/workshops/duplicate/{workshop}'
 */
export const duplicate = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: duplicate.url(args, options),
    method: 'get',
})

duplicate.definition = {
    methods: ["get","head"],
    url: '/workshops/duplicate/{workshop}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WorkshopHistoryController::duplicate
 * @see app/Http/Controllers/WorkshopHistoryController.php:27
 * @route '/workshops/duplicate/{workshop}'
 */
duplicate.url = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { workshop: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { workshop: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    workshop: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        workshop: typeof args.workshop === 'object'
                ? args.workshop.id
                : args.workshop,
                }

    return duplicate.definition.url
            .replace('{workshop}', parsedArgs.workshop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopHistoryController::duplicate
 * @see app/Http/Controllers/WorkshopHistoryController.php:27
 * @route '/workshops/duplicate/{workshop}'
 */
duplicate.get = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: duplicate.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WorkshopHistoryController::duplicate
 * @see app/Http/Controllers/WorkshopHistoryController.php:27
 * @route '/workshops/duplicate/{workshop}'
 */
duplicate.head = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: duplicate.url(args, options),
    method: 'head',
})
const WorkshopHistoryController = { index, duplicate }

export default WorkshopHistoryController