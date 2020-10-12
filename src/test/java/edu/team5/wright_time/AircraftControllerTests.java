package edu.team5.wright_time;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.team5.wright_time.controller.AircraftController;
import edu.team5.wright_time.model.entity.Aircraft;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class AircraftControllerTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AircraftController controller;

    @Test
    void testGetAircraft() throws Exception {
        var aircraft1 = new Aircraft("Man1", "Nam1", "Mod1", 1999, 2, 2);
        var aircraft2 = new Aircraft("Man2", "Nam2", "Mod2", 2000, 3, 3);
        var aircraftList = new ArrayList<Aircraft>();
        aircraftList.add(aircraft1);
        aircraftList.add(aircraft2);
        given(controller.getAircraft()).willReturn(aircraftList);
        this.mvc.perform(get("/api/aircraft")).andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].manufacturer", Matchers.equalTo("Man1")))
                .andExpect(jsonPath("$[0].name", Matchers.equalTo("Nam1")))
                .andExpect(jsonPath("$[0].model", Matchers.equalTo("Mod1")))
                .andExpect(jsonPath("$[0].year", Matchers.equalTo(1999)))
                .andExpect(jsonPath("$[0].maintenanceDay", Matchers.equalTo(2)))
                .andExpect(jsonPath("$[0].minimumTrainingDuration", Matchers.equalTo(2)))
                .andExpect(jsonPath("$[1].manufacturer", Matchers.equalTo("Man2")))
                .andExpect(jsonPath("$[1].name", Matchers.equalTo("Nam2")))
                .andExpect(jsonPath("$[1].model", Matchers.equalTo("Mod2")))
                .andExpect(jsonPath("$[1].year", Matchers.equalTo(2000)))
                .andExpect(jsonPath("$[1].maintenanceDay", Matchers.equalTo(3)))
                .andExpect(jsonPath("$[1].minimumTrainingDuration", Matchers.equalTo(3)));

    }

    //https://reflectoring.io/spring-boot-web-controller-test/
    @Test
    void testAddAircraft() throws Exception {
        var aircraft3 = new Aircraft("Man3", "Nam3", "Mod3", 2001, 4, 5);
        this.mvc.perform(post("/api/aircraft")
                .contentType("application/json")
                .param("aircraft3.getManufacturer()", "Man3")
                .param("aircraft3.getName()", "Nam3")
                .param("aircraft3.getModel()", "Mod3")
                .param("aircraft3.getYear()", "2001")
                .param("aircraft3.getMaintenanceDay()", "4")
                .param("aircraft3.getMinimumTrainingDuration()", "5")
                .content(objectMapper.writeValueAsString(aircraft3)))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteAircraft() throws Exception {
        this.mvc.perform(MockMvcRequestBuilders
                .delete("/api/aircraft/{id}", "0")
                .contentType("application/json")
                .accept("application/json"))
            .andExpect(status().isOk());
    }

}
