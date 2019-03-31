package myapp;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import myapp.dbconnector.Statement;


public class GetMeterData extends HttpServlet {
    @Override
  	public void doPost(HttpServletRequest req, HttpServletResponse resp)
      	throws IOException {
        Gson gson = new Gson();
        PrintWriter out = resp.getWriter();
        try{
            String input = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            Request request = gson.fromJson(input, Request.class);
            if(request.long1 == null || request.long2 == null || request.lat1 == null || request.lat2 == null){
                out.print(gson.toJson(new Response(false, "One or more requested fields was not provided")));
                out.flush();
                return;
            }
            // Swap if coordinates are misorder
            if(request.long1 > request.long2){
                double temp = request.long1;
                request.long1 = request.long2;
                request.long2 = temp;
            }
            if(request.lat1 > request.lat2){
                double temp = request.lat1;
                request.lat1 = request.lat2;
                request.lat2 = temp;
            }
            
            String statement = String.format("SELECT m.id, m.latitude, m.longitude, wdata.now, wdata.day, wdata.week, wdata.month FROM meters m "+
            "JOIN("+
                "SELECT water.time, water.id, water.water as now, wday.day as day, wweek.week as week, wmonth.month as month "+
                    "FROM water "+
                "LEFT JOIN(SELECT id, water as day, time FROM water ORDER BY water.time DESC LIMIT 1 OFFSET 24) wday ON wday.id = water.id "+
                "LEFT JOIN(SELECT id, water as week, time FROM water ORDER BY water.time DESC LIMIT 1 OFFSET 168) wweek ON wweek.id = water.id "+
                "LEFT JOIN(SELECT id, water as month, time FROM water ORDER BY water.time DESC LIMIT 1 OFFSET 720) wmonth ON wmonth.id = water.id "+
                "ORDER BY water.time DESC LIMIT 1) as wdata ON wdata.id = m.id "+
            "WHERE latitude > %f AND latitude < %f AND longitude > %f AND longitude < %f;", request.lat1, request.lat2, request.long1, request.long2);
            ArrayList<Double[]> data = Statement.getInstance().getWaterData(statement);
            Response response = new Response(data.size());
            for(int i = 0; i<data.size(); i++){
                double now = data.get(i)[2];
                double day = data.get(i)[3] == 0 ? -1 : now - data.get(i)[3];
                double week = data.get(i)[4] == 0 ? -1 : now - data.get(i)[4];
                double month = data.get(i)[5] == 0 ? -1 : now - data.get(i)[5];

                response.AddResult(data.get(i)[0], data.get(i)[1], day, week, month, i);
            }
            out.print(gson.toJson(response));
        }catch(Exception e){
            e.printStackTrace(System.out);
            out.print(gson.toJson(new Response(false, e.toString())));
        }
    }

    private class Response{
        public Response(boolean success, String error){
            this.success = success;
            this.error = error;
        }
        public Response(int result_count){
            this.success = true;
            this.error = "";
            this.results = new MemberData[result_count];
        }
        public void AddResult(double lat, double lon, double day, double week, double month, int index){
            results[index] = new MemberData(lat, lon, day, week, month);
        }
        private MemberData[] results;
        private boolean success;
        private String error;
        public class MemberData{
            private double latitude, longitude, day, week, month;
            public MemberData(double lat, double lon, double day, double week, double month){
                this.latitude = lat;
                this.longitude = lon;
                this.day = day;
                this.week = week;
                this.month = month;
            }
        }
    }
    private class Request{
        public Request(){}
        private Double lat1, lat2;
        private Double long1, long2;
    }

}