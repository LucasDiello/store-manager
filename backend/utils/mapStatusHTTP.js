const httpErrorMap = {
    SUCCESSFUL: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNPROCESSABLE_ENTITY: 422,
};

const mapStatusHTTP = (status) => httpErrorMap[status] || 500;

module.exports = { mapStatusHTTP };
