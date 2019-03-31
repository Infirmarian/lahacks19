package myapp;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import myapp.dbconnector.Statement;
import myapp.utilities.Pair;


public class RegisterMeter extends HttpServlet {
    private final String API_KEY = System.getenv("GEO_API_KEY");
  @Override
  public void doPost(HttpServletRequest req, HttpServletResponse resp)
      throws IOException {
    resp.setContentType("application/json");
    Gson gson = new Gson();
    PrintWriter out = resp.getWriter();

    try{
        String input = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));

        RegistrationData regData = gson.fromJson(input, RegistrationData.class);
        if(regData.latitude == null || regData.longitude == null){
            out.print(gson.toJson(new ResponseJSON(false, "One or more expected registration data pieces were missing")));
            out.flush();
            return;
        }
        Pair<Double, Double> finalLat = centerLocation(regData.latitude, regData.longitude, gson);
        if(finalLat == null || finalLat.one == null || finalLat.two == null){
            out.print(gson.toJson(new ResponseJSON(false, "Unable to correctly find the address")));
            return;
        }
        UUID uuid = UUID.randomUUID();
        String sqlstatement = String.format("INSERT INTO meters(id, latitude, longitude, registrationdate) VALUES ('%s', %f, %f, NOW())", uuid.toString(), finalLat.one, finalLat.two);
        Statement psqlwriter = Statement.getInstance();
        psqlwriter.WriteStatement(sqlstatement);
        out.print(gson.toJson(new ResponseJSON(true, uuid)));
        out.flush();

    }catch(Exception e){
        ResponseJSON rj = new ResponseJSON(false, e.toString());
        e.printStackTrace(System.out);
        out.print(gson.toJson(rj));
        out.flush();

    }
    }
    private Pair<Double, Double> centerLocation(double lat, double lon, Gson gson) throws Exception{
        URL url = new URL(String.format("https://maps.googleapis.com/maps/api/geocode/json?latlng=%f,%f&key=%s", lat, lon, API_KEY));
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        int code = con.getResponseCode();
        if(code >= 400){
            throw new Exception("Bad response from API, status code "+code);
        }
        BufferedReader in = new BufferedReader(new InputStreamReader( con.getInputStream())); 
        String inputLine; 
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        } 
        in.close();
        MapJSON coords = gson.fromJson(response.toString(), MapJSON.class);
        if(! coords.status.equals("OK"))
            throw new Exception(coords.error_message);
        Pair<Double, Double> result = new Pair<>(coords.results.get(0).geometry.location.lat, coords.results.get(0).geometry.location.lng); 
        return result;
    }

    private class MapJSON{
        public MapJSON(){}
        private List<Result> results;
        private String status;
        private String error_message;
    }
    private class Result{
        public Result(){}
        Geometry geometry;
    }
    private class Geometry{
        public Geometry(){}
        public Location location;
    }
    private class Location{
        public Location(){}
        public Double lat;
        public Double lng;
    }
        
  
  private class ResponseJSON{
      ResponseJSON(boolean success, String error){
          this.success = success;
          this.error = error;
          this.uuid = "";
      }
      ResponseJSON(boolean success, UUID uuid){
        this.success = success;
        this.error = "";
        this.uuid = uuid.toString();
    }
      private boolean success;
      private String error;
      private String uuid;
  }

  private class RegistrationData{
    RegistrationData(){}
    private Double latitude;
    private Double longitude;
}

}