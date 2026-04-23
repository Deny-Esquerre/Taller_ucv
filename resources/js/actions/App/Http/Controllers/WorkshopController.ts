import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
const WorkshopController = { complete, index, create, store, show, edit, update, destroy }

export default WorkshopController