package myapp.dbconnector;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.sql.DataSource;


public class Statement {
    private final String DB_NAME = System.getenv("DB_NAME");
    private final String DB_USER = System.getenv("DB_USER");
    private final String DB_PASS = System.getenv("DB_PASS");
    private final String CLOUD_SQL_INSTANCE_NAME = System.getenv("CLOUD_SQL_INSTANCE_NAME");
    private DataSource pool;
    
    public static Statement instance;
    public Statement(){
        if(instance == null){
            instance = this;
        }
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(String.format("jdbc:postgresql:///%s", DB_NAME));
        config.setUsername(DB_USER); 
        config.setPassword(DB_PASS);
        config.addDataSourceProperty("socketFactory", "com.google.cloud.sql.postgres.SocketFactory");
        config.addDataSourceProperty("cloudSqlInstance", CLOUD_SQL_INSTANCE_NAME);

        pool = new HikariDataSource(config);

    }

    public boolean WriteStatement(String query){
        try (Connection connection = pool.getConnection()) {
            PreparedStatement statement = connection.prepareStatement(query);
            statement.execute();
        }catch(Exception e){
            return false;
        }
        return true;
    }

}