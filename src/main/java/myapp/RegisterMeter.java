package myapp;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import myapp.dbconnector.Statement;


public class RegisterMeter extends HttpServlet {
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
        UUID uuid = UUID.randomUUID();
        String sqlstatement = String.format("INSERT INTO meters(id, latitude, longitude, registrationdate) VALUES ('%s', %f, %f, NOW())", uuid.toString(), regData.latitude, regData.longitude);
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