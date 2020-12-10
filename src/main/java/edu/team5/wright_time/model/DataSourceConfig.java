package edu.team5.wright_time.model;

//@Configuration
public class DataSourceConfig {

//    @Bean
//    public DataSource getDataSource() {
//        String type = System.getenv("database.type");
//        String user = System.getenv("database.username");
//        String pass = System.getenv("database.password");
//        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
//        if(type.equals("mysql")) {
//            dataSourceBuilder.url("jdbc:mysql://localhost:3306/wright_time");
//        } else if(type.equals("h2")) {
//            dataSourceBuilder.driverClassName("org.h2.Driver");
//            dataSourceBuilder.url("jdbc:h2:mem:test");
//        } else {
//            throw new NoSuchElementException("No database type: " + type + " configured.");
//        }
//        dataSourceBuilder.username(user);
//        dataSourceBuilder.password(pass);
//        return dataSourceBuilder.build();
//    }
}
