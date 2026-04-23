import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import manageF1b31d from './manage'
/**
* @see \App\Http\Controllers\WorkshopManagementController::manage
 * @see app/Http/Controllers/WorkshopManagementController.php:13
 * @route '/workshops/manage'
 */
export const manage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(options),
    method: 'get',
})

manage.definition = {
    methods: ["get","head"],
    url: '/workshops/manage',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WorkshopManagementController::manage
 * @see app/Http/Controllers/WorkshopManagementController.php:13
 * @route '/workshops/manage'
 */
manage.url = (options?: RouteQueryOptions) => {
    return manage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopManagementController::manage
 * @see app/Http/Controllers/WorkshopManagementController.php:13
 * @route '/workshops/manage'
 */
manage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WorkshopManagementController::manage
 * @see app/Http/Controllers/WorkshopManagementController.php:13
 * @route '/workshops/manage'
 */
manage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manage.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WorkshopManagementController::manage
 * @see app/Http/Controllers/WorkshopManagementController.php:13
 * @route '/workshops/manage'
 */
    const manageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manage.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WorkshopManagementController::manage
 * @see app/Http/Controllers/WorkshopManagementController.php:13
 * @route '/workshops/manage'
 */
        manageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manage.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WorkshopManagementController::manage
 * @see app/Http/Controllers/WorkshopManagementController.php:13
 * @route '/workshops/manage'
 */
        manageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    manage.form = manageForm
/**
* @see \App\Http\Controllers\WorkshopController::complete
 * @see app/Http/Controllers/WorkshopController.php:97
 * @route '/workshops/{workshop}/complete'
 */
export const complete = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: complete.url(args, options),
    method: 'put',
})

complete.definition = {
    methods: ["put"],
    url: '/workshops/{workshop}/complete',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\WorkshopController::complete
 * @see app/Http/Controllers/WorkshopController.php:97
 * @route '/workshops/{workshop}/complete'
 */
complete.url = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return complete.definition.url
            .replace('{workshop}', parsedArgs.workshop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopController::complete
 * @see app/Http/Controllers/WorkshopController.php:97
 * @route '/workshops/{workshop}/complete'
 */
complete.put = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: complete.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\WorkshopController::complete
 * @see app/Http/Controllers/WorkshopController.php:97
 * @route '/workshops/{workshop}/complete'
 */
    const completeForm = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WorkshopController::complete
 * @see app/Http/Controllers/WorkshopController.php:97
 * @route '/workshops/{workshop}/complete'
 */
        completeForm.put = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \App\Http\Controllers\WorkshopHistoryController::history
 * @see app/Http/Controllers/WorkshopHistoryController.php:12
 * @route '/workshops/history'
 */
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/workshops/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WorkshopHistoryController::history
 * @see app/Http/Controllers/WorkshopHistoryController.php:12
 * @route '/workshops/history'
 */
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopHistoryController::history
 * @see app/Http/Controllers/WorkshopHistoryController.php:12
 * @route '/workshops/history'
 */
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WorkshopHistoryController::history
 * @see app/Http/Controllers/WorkshopHistoryController.php:12
 * @route '/workshops/history'
 */
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WorkshopHistoryController::history
 * @see app/Http/Controllers/WorkshopHistoryController.php:12
 * @route '/workshops/history'
 */
    const historyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WorkshopHistoryController::history
 * @see app/Http/Controllers/WorkshopHistoryController.php:12
 * @route '/workshops/history'
 */
        historyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WorkshopHistoryController::history
 * @see app/Http/Controllers/WorkshopHistoryController.php:12
 * @route '/workshops/history'
 */
        historyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
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

    /**
* @see \App\Http\Controllers\WorkshopHistoryController::duplicate
 * @see app/Http/Controllers/WorkshopHistoryController.php:27
 * @route '/workshops/duplicate/{workshop}'
 */
    const duplicateForm = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: duplicate.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WorkshopHistoryController::duplicate
 * @see app/Http/Controllers/WorkshopHistoryController.php:27
 * @route '/workshops/duplicate/{workshop}'
 */
        duplicateForm.get = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: duplicate.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WorkshopHistoryController::duplicate
 * @see app/Http/Controllers/WorkshopHistoryController.php:27
 * @route '/workshops/duplicate/{workshop}'
 */
        duplicateForm.head = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: duplicate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    duplicate.form = duplicateForm
/**
* @see \App\Http\Controllers\WorkshopController::index
 * @see app/Http/Controllers/WorkshopController.php:12
 * @route '/workshops'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/workshops',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WorkshopController::index
 * @see app/Http/Controllers/WorkshopController.php:12
 * @route '/workshops'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopController::index
 * @see app/Http/Controllers/WorkshopController.php:12
 * @route '/workshops'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WorkshopController::index
 * @see app/Http/Controllers/WorkshopController.php:12
 * @route '/workshops'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WorkshopController::index
 * @see app/Http/Controllers/WorkshopController.php:12
 * @route '/workshops'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WorkshopController::index
 * @see app/Http/Controllers/WorkshopController.php:12
 * @route '/workshops'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WorkshopController::index
 * @see app/Http/Controllers/WorkshopController.php:12
 * @route '/workshops'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\WorkshopController::create
 * @see app/Http/Controllers/WorkshopController.php:23
 * @route '/workshops/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/workshops/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WorkshopController::create
 * @see app/Http/Controllers/WorkshopController.php:23
 * @route '/workshops/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopController::create
 * @see app/Http/Controllers/WorkshopController.php:23
 * @route '/workshops/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WorkshopController::create
 * @see app/Http/Controllers/WorkshopController.php:23
 * @route '/workshops/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WorkshopController::create
 * @see app/Http/Controllers/WorkshopController.php:23
 * @route '/workshops/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WorkshopController::create
 * @see app/Http/Controllers/WorkshopController.php:23
 * @route '/workshops/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WorkshopController::create
 * @see app/Http/Controllers/WorkshopController.php:23
 * @route '/workshops/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\WorkshopController::store
 * @see app/Http/Controllers/WorkshopController.php:32
 * @route '/workshops'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/workshops',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\WorkshopController::store
 * @see app/Http/Controllers/WorkshopController.php:32
 * @route '/workshops'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopController::store
 * @see app/Http/Controllers/WorkshopController.php:32
 * @route '/workshops'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\WorkshopController::store
 * @see app/Http/Controllers/WorkshopController.php:32
 * @route '/workshops'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WorkshopController::store
 * @see app/Http/Controllers/WorkshopController.php:32
 * @route '/workshops'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\WorkshopController::show
 * @see app/Http/Controllers/WorkshopController.php:52
 * @route '/workshops/{workshop}'
 */
export const show = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/workshops/{workshop}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WorkshopController::show
 * @see app/Http/Controllers/WorkshopController.php:52
 * @route '/workshops/{workshop}'
 */
show.url = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{workshop}', parsedArgs.workshop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopController::show
 * @see app/Http/Controllers/WorkshopController.php:52
 * @route '/workshops/{workshop}'
 */
show.get = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WorkshopController::show
 * @see app/Http/Controllers/WorkshopController.php:52
 * @route '/workshops/{workshop}'
 */
show.head = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WorkshopController::show
 * @see app/Http/Controllers/WorkshopController.php:52
 * @route '/workshops/{workshop}'
 */
    const showForm = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WorkshopController::show
 * @see app/Http/Controllers/WorkshopController.php:52
 * @route '/workshops/{workshop}'
 */
        showForm.get = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WorkshopController::show
 * @see app/Http/Controllers/WorkshopController.php:52
 * @route '/workshops/{workshop}'
 */
        showForm.head = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\WorkshopController::edit
 * @see app/Http/Controllers/WorkshopController.php:61
 * @route '/workshops/{workshop}/edit'
 */
export const edit = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/workshops/{workshop}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\WorkshopController::edit
 * @see app/Http/Controllers/WorkshopController.php:61
 * @route '/workshops/{workshop}/edit'
 */
edit.url = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{workshop}', parsedArgs.workshop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopController::edit
 * @see app/Http/Controllers/WorkshopController.php:61
 * @route '/workshops/{workshop}/edit'
 */
edit.get = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\WorkshopController::edit
 * @see app/Http/Controllers/WorkshopController.php:61
 * @route '/workshops/{workshop}/edit'
 */
edit.head = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\WorkshopController::edit
 * @see app/Http/Controllers/WorkshopController.php:61
 * @route '/workshops/{workshop}/edit'
 */
    const editForm = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\WorkshopController::edit
 * @see app/Http/Controllers/WorkshopController.php:61
 * @route '/workshops/{workshop}/edit'
 */
        editForm.get = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\WorkshopController::edit
 * @see app/Http/Controllers/WorkshopController.php:61
 * @route '/workshops/{workshop}/edit'
 */
        editForm.head = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\WorkshopController::update
 * @see app/Http/Controllers/WorkshopController.php:72
 * @route '/workshops/{workshop}'
 */
export const update = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/workshops/{workshop}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\WorkshopController::update
 * @see app/Http/Controllers/WorkshopController.php:72
 * @route '/workshops/{workshop}'
 */
update.url = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{workshop}', parsedArgs.workshop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopController::update
 * @see app/Http/Controllers/WorkshopController.php:72
 * @route '/workshops/{workshop}'
 */
update.put = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\WorkshopController::update
 * @see app/Http/Controllers/WorkshopController.php:72
 * @route '/workshops/{workshop}'
 */
update.patch = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\WorkshopController::update
 * @see app/Http/Controllers/WorkshopController.php:72
 * @route '/workshops/{workshop}'
 */
    const updateForm = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WorkshopController::update
 * @see app/Http/Controllers/WorkshopController.php:72
 * @route '/workshops/{workshop}'
 */
        updateForm.put = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\WorkshopController::update
 * @see app/Http/Controllers/WorkshopController.php:72
 * @route '/workshops/{workshop}'
 */
        updateForm.patch = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\WorkshopController::destroy
 * @see app/Http/Controllers/WorkshopController.php:90
 * @route '/workshops/{workshop}'
 */
export const destroy = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/workshops/{workshop}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\WorkshopController::destroy
 * @see app/Http/Controllers/WorkshopController.php:90
 * @route '/workshops/{workshop}'
 */
destroy.url = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{workshop}', parsedArgs.workshop.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\WorkshopController::destroy
 * @see app/Http/Controllers/WorkshopController.php:90
 * @route '/workshops/{workshop}'
 */
destroy.delete = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\WorkshopController::destroy
 * @see app/Http/Controllers/WorkshopController.php:90
 * @route '/workshops/{workshop}'
 */
    const destroyForm = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\WorkshopController::destroy
 * @see app/Http/Controllers/WorkshopController.php:90
 * @route '/workshops/{workshop}'
 */
        destroyForm.delete = (args: { workshop: number | { id: number } } | [workshop: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const workshops = {
    manage: Object.assign(manage, manageF1b31d),
complete: Object.assign(complete, complete),
history: Object.assign(history, history),
duplicate: Object.assign(duplicate, duplicate),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default workshops