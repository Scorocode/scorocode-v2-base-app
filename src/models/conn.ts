import { createConnection, Connection, ConnectionManager, getConnection } from 'typeorm';
import { randomBytes } from 'crypto'

// entities:
import example from './entity/example'

// migrations rules
import { Updatedtrigger1540382929805 } from './migration/1540382929805-updatedtrigger'
import { Example1540384585120 } from './migration/1540384585120-example'

const obj = (() => {

  const schemaName = 'public'

  let defaultConn: Connection = null

  // http://typeorm.io/#/
  const create = function (): Promise<Connection> {
    const id = randomBytes(16).toString('hex')

    return createConnection({
      name: `conn${id}`,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'project',
      schema: schemaName,
      username: 'postgres',
      password: '123456',
      synchronize: false,
      logging: true,
      migrationsRun: true,
      migrationsTableName: 'migration_history',
      entities: [
        example,
      ],
      migrations: [
        Updatedtrigger1540382929805,
        Example1540384585120,
      ],
      subscribers: []
    })
  }

  const setDefault = (conn: Connection): void => {
    defaultConn = conn
  }

  const getDefault = (): Connection => {
    return defaultConn
  }

  const initDefault = async (): Promise<Connection> => {

    if (defaultConn) {
      return defaultConn
    }

    const conn = await create()
    setDefault(conn)

    return getDefault()
  }

  return {
    schemaName,
    create,
    setDefault,
    getDefault,
    initDefault,
  }
})()

export default obj;
