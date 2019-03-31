package myapp.dbconnector;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import myapp.utilities.Pair;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Map;

import javax.sql.DataSource;


public class Statement {
    private final String DB_NAME = System.getenv("DB_NAME");
    private final String DB_USER = System.getenv("DB_USER");
    private final String DB_PASS = System.getenv("DB_PASS");
    private final String CLOUD_SQL_INSTANCE_NAME = System.getenv("CLOUD_SQL_INSTANCE_NAME");
    private DataSource pool;
    
    private static Statement instance;
    public Statement(){
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(String.format("jdbc:postgresql:///%s", DB_NAME));
        config.setUsername(DB_USER); 
        config.setPassword(DB_PASS);

        config.addDataSourceProperty("socketFactory", "com.google.cloud.sql.postgres.SocketFactory");
        config.addDataSourceProperty("cloudSqlInstance", CLOUD_SQL_INSTANCE_NAME);

        pool = new HikariDataSource(config);
    }

    public static Statement getInstance(){
        if(instance == null){
            instance = new Statement();
        }
        return instance;
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
    public int WriteStatementCountRows(String query){
        try (Connection connection = pool.getConnection()) {
            PreparedStatement statement = connection.prepareStatement(query);
            ResultSet rs = statement.executeQuery();
            int count = 0;
            while(rs.next())
                count++;
            return count;
        }catch(Exception e){
            return 0;
        }
    }
    public boolean InsertOrUpdateCheck(String query){
        try (Connection connection = pool.getConnection()) {
            PreparedStatement statement = connection.prepareStatement(query);
            return statement.executeUpdate() > 0;
        }catch(Exception e){
            return false;
        }
    }
    public ArrayList<Double[]> getWaterData(String stmt){
        ArrayList<Double[]> result = new ArrayList<>();
        try(Connection connection = pool.getConnection()){
            PreparedStatement statement = connection.prepareStatement(stmt);
            ResultSet rs = statement.executeQuery();
            while(rs.next()){
                Double[] data = new Double[6];
                data[0] = rs.getDouble("latitude");
                data[1] = rs.getDouble("longitude");
                data[2] = rs.getDouble("now");
                data[3] = rs.getDouble("day");
                data[4] = rs.getDouble("week");
                data[5] = rs.getDouble("month");
                result.add(data);
            }
        }catch(Exception e){
            System.err.println(e);
            return null;
        }
        return result;
    }

}