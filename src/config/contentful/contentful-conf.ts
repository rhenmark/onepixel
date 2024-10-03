import * as contentful from "contentful"

const spaceID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN as string

const client = contentful.createClient({
    space: spaceID,
    accessToken: accessToken
})


export { client }
