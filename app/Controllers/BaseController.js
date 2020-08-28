'use strict'

class BaseController {
    constructor(repo) {
        this.repo = repo
    }

    async index({response}) {
        return this.repo.index(response)
    }

    async store({request, response}) {
        return this.repo.store(request, response)
    }

    async show({params, response}) {
        return this.repo.show(params, response)
    }

    async update({params, request, response}) {
        return this.repo.update(params, request, response)
    }

    async destroy({params, response}) {
        return this.repo.destroy(params, response)
    }

    async sendMyResponse(data,msg='Data retrieved succesfully.',status=200){
        
        let obj = { 
            'status': status,
            'data': data,
            'message': msg
        };
        return obj
    }



    /*Response automatically differ for API call and HTML call*/
    async globalResponse(request, response, view, data, viewName, pageInfo) {
        const bestFormat = request.accepts(['json', 'html'])
        // let formattedData = {data: data && data.rows ? data.rows : data, pagination: data.pages ? data.pages : null}
        let formattedData = data
        if (bestFormat === 'json') {
            return response.json(formattedData)

        } else {

            formattedData.componentData = await this.componentData()
            formattedData.pageInfo = pageInfo
            return view.render(viewName, formattedData)

        }

    }
}

module.exports = BaseController
