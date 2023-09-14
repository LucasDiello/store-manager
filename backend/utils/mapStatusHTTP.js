const httpErrorMap = {
    SUCCESSFUL: 200,
    CREATED: 201,
    NOT_FOUND: 404,
};

const mapStatusHTTP = (status) => httpErrorMap[status] || 500;

module.exports = { mapStatusHTTP };
