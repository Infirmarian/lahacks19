package myapp;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.repackaged.com.google.gson.Gson;


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
        if(regData.latitude == null || regData.longitude == null || regData.uuid == null){
            out.print(gson.toJson(new ResponseJSON(false, "One or more expected registration data pieces were missing")));
            out.flush();
            return;
        }
        System.out.println(regData.uuid);
        out.print(gson.toJson(new ResponseJSON(true)));
        out.flush();

    }catch(Exception e){
        ResponseJSON rj = new ResponseJSON(false, e.toString());
        out.print(gson.toJson(rj));
        out.flush();

    }
  }
  private class ResponseJSON{
      ResponseJSON(boolean success, String error){
          this.success = success;
          this.error = error;
      }
      ResponseJSON(boolean success){
          this.success = success;
          this.error = "";
      }
      private boolean success;
      private String error;
  }

  private class RegistrationData{
    RegistrationData(){}
    private Double latitude;
    private Double longitude;
    private String uuid;
}

}