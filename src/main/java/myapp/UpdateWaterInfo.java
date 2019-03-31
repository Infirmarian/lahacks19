package myapp;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import myapp.dbconnector.Statement;

public class UpdateWaterInfo extends HttpServlet {
	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
	throws IOException {
		Gson gson = new Gson();
		PrintWriter out = resp.getWriter();
		resp.setContentType("application/json");

		try{
			String input = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
			Request requestBody = gson.fromJson(input, Request.class);
			if(requestBody.uuid == null || requestBody.water == null){
				out.print(gson.toJson(new Response(false, "One or more required elements were missing")));
				out.flush();
				return;
			}
			String statement = String.format("INSERT INTO water(id, time, water) VALUES ('%s', TIMEZONE('utc', NOW()), %f)", requestBody.uuid, requestBody.water);
			Statement.getInstance().WriteStatement(statement);
			out.print(gson.toJson(new Response(true, "")));
		}catch (Exception e){
			out.print(gson.toJson(new Response(false, e.toString())));
		}
	}

	private class Response{
		public Response(boolean success, String error){
			this.success = success;
			this.error = error;
		}
		private boolean success;
		private String error;
	}
	private class Request{
		public Request(){}
		private String uuid;
		private Double water;
	}
}